#import "DetailViewController.h"

@interface DetailViewController ()

@end

@implementation DetailViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initComponents];
}

-(void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    _activityIndicator = [[UIActivityIndicatorView alloc]initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
    _activityIndicator.center = CGPointMake(_photo.frame.size.width / 2.0, _photo.frame.size.height / 2.0);
    _activityIndicator.color = [UIColor whiteColor];
    [_photo addSubview: _activityIndicator];
}

-(void)initComponents
{
    _photo.layer.borderWidth = 2;
    _photo.layer.borderColor = [[UIColor whiteColor] CGColor];
    _photo.layer.cornerRadius = 30;
    _reportButton.layer.borderWidth = 2;
    _reportButton.layer.borderColor = [[UIColor whiteColor] CGColor];
    _reportButton.layer.cornerRadius = 10;
    _name.text = _match.name;
    _percent.text = [NSString stringWithFormat:@"%@%% Match", _match.percent];
    NSData * imgData = [NSData dataWithContentsOfURL:[NSURL URLWithString:_match.imageURL]];
    if (imgData != NULL)
        _photo.image = [UIImage imageWithData:imgData];
}

- (IBAction)closeButtonClicked:(id)sender
{
     [self dismissViewControllerAnimated:YES completion:nil];
}

- (IBAction)reportButtonClicked:(id)sender
{
    @try
    {
        [self reportPhoto];
    }
    @catch(NSException *exception)
    {
        NSLog(@"[DetailViewController (reportPhoto): %@]", exception);
        _ac = [UIAlertController alertControllerWithTitle:@"Alert" message:@"Unable to Upload the Photo" preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *ok = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
        [_ac addAction:ok];
        [self presentViewController:_ac animated:YES completion:nil];
    }
}

-(void)reportPhoto
{
    [_activityIndicator startAnimating];
    [self.view setUserInteractionEnabled:FALSE];
    
    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:configuration delegate:self delegateQueue:nil];
    
    NSData *imageData = UIImageJPEGRepresentation(_photo.image, 1.0);
    
    NSString *boundary = [NSString stringWithFormat:@"---------------------------14737809831466499882746641449"];
    NSString *contentType = [NSString stringWithFormat:@"multipart/form-data; boundary=%@", boundary];
    
    NSURL *url = [NSURL URLWithString:@"https://www.headlightlabs.com/api/gcpd_report?api_key=ADcbZQzX7tleNrJRi9DzKg"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:5.0];
    [request setHTTPMethod:@"POST"];
    [request setValue:contentType forHTTPHeaderField:@"content-Type"];
    
    NSString *fileName = @"image";
    
    NSMutableData *body = [NSMutableData data];
    
    [body appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n", boundary] dataUsingEncoding:NSUTF8StringEncoding]];
    
    if(imageData)
        [body appendData:[[NSString stringWithFormat:@"%@%@%@", @"Content-Disposition: form-data; name=image; filename=\"",fileName,@".jpg\"\r\n"] dataUsingEncoding:NSUTF8StringEncoding]];
    [body appendData:[@"Content-Type: image/jpeg\r\n\r\n" dataUsingEncoding:NSUTF8StringEncoding]];
    
    if (imageData)
        [body appendData:[NSData dataWithData:imageData]];
    [body appendData:[[NSString stringWithFormat:@"\r\n--%@--\r\n", boundary] dataUsingEncoding:NSUTF8StringEncoding]];
    
    [request setHTTPBody:body];
    
    NSURLSessionDataTask *postDataTask = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        
        if (data != nil)
        {
            NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
            NSString *status = [dic objectForKey:@"status"];
            
            dispatch_async(dispatch_get_main_queue(), ^{
                
                self->_ac = [UIAlertController alertControllerWithTitle:@"Status" message:status preferredStyle:UIAlertControllerStyleAlert];
                UIAlertAction *ok = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler: ^(UIAlertAction * action){
                    [self dismissViewControllerAnimated:YES completion:nil];
                }];
                
                [self->_ac addAction:ok];
                [self->_activityIndicator stopAnimating];
                [self.view setUserInteractionEnabled:YES];
                [self presentViewController:self->_ac animated:YES completion:nil];
                
            });
        }
        else
        {
            dispatch_async(dispatch_get_main_queue(), ^{
                
                self->_ac = [UIAlertController alertControllerWithTitle:@"Status" message:@"This Photo is not allowed to be reported" preferredStyle:UIAlertControllerStyleAlert];
                UIAlertAction *ok = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler: ^(UIAlertAction * action){
                   // [self dismissViewControllerAnimated:YES completion:nil];
                }];
                
                [self->_ac addAction:ok];
                [self->_activityIndicator stopAnimating];
                [self.view setUserInteractionEnabled:YES];
                [self presentViewController:self->_ac animated:YES completion:nil];
                
            });
        }
        
    }];
    
    [postDataTask resume];
}

@end
