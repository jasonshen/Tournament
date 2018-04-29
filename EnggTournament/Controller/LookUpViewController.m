#import "LookUpViewController.h"

@interface LookUpViewController ()

@end

@implementation LookUpViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
}

-(void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    [self initComponents];
}

-(void)initComponents
{
    _imageToLookUp.layer.borderWidth = 2;
    _imageToLookUp.layer.borderColor = [[UIColor whiteColor] CGColor];
    _imageToLookUp.layer.cornerRadius = 30;
    _lookUpButton.layer.borderWidth = 2;
    _lookUpButton.layer.borderColor = [[UIColor whiteColor] CGColor];
    _lookUpButton.layer.cornerRadius = 10;
    _activityIndicator = [[UIActivityIndicatorView alloc]initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
    _activityIndicator.center = CGPointMake(_imageToLookUp.frame.size.width / 2.0, _imageToLookUp.frame.size.height / 2.0);
    _activityIndicator.color = [UIColor whiteColor];
    [_imageToLookUp addSubview: _activityIndicator];
    _picker=[[UIImagePickerController alloc]init];
    _picker.sourceType=UIImagePickerControllerSourceTypePhotoLibrary;
    _picker.delegate=self;
}

- (IBAction)imageTapped:(id)sender
{
    [self presentViewController:_picker animated:YES completion:nil];
}

-(void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
    [self dismissViewControllerAnimated:YES completion:nil];
}

-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    _imageToLookUp.image = [info objectForKey:@"UIImagePickerControllerOriginalImage"];
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (IBAction)lookUpButtonClicked:(id)sender
{
    if(_imageToLookUp.image == nil)
    {
        _ac = [UIAlertController alertControllerWithTitle:@"No Photo" message:@"Please Select Photo to Upload" preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *ok = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
        [_ac addAction:ok];
        [self presentViewController:_ac animated:YES completion:nil];
    }
    else
    {
        @try
        {
            [self uploadPhoto];
        }
        @catch(NSException *exception)
        {
            NSLog(@"[LookUpViewController (uploadPhoto): %@]", exception);
            _ac = [UIAlertController alertControllerWithTitle:@"Alert" message:@"Unable to Upload the Photo" preferredStyle:UIAlertControllerStyleAlert];
            UIAlertAction *ok = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
            [_ac addAction:ok];
            [self presentViewController:_ac animated:YES completion:nil];
        }
        
    }
}

-(void)uploadPhoto
{
    [_activityIndicator startAnimating];
    [self.view setUserInteractionEnabled:FALSE];
    
    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:configuration delegate:self delegateQueue:nil];
    
    NSData *imageData = UIImageJPEGRepresentation(_imageToLookUp.image, 1.0);
    
    NSString *boundary = [NSString stringWithFormat:@"---------------------------14737809831466499882746641449"];
    NSString *contentType = [NSString stringWithFormat:@"multipart/form-data; boundary=%@", boundary];
    
    NSURL *url = [NSURL URLWithString:@"https://www.headlightlabs.com/api/gcpd_lookup?api_key=ADcbZQzX7tleNrJRi9DzKg"];
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
        
        if(data == nil)
        {
            dispatch_async(dispatch_get_main_queue(), ^{
                
                self->_ac = [UIAlertController alertControllerWithTitle:@"Alert" message:@"Unable to Upload Photo" preferredStyle:UIAlertControllerStyleAlert];
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
            NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
            
            dispatch_async(dispatch_get_main_queue(), ^{
                
                Match *match = [[Match alloc]init];
                match.name = [dic objectForKey:@"closest_match"];
                match.imageURL = [dic objectForKey:@"location"];
                match.percent = [dic objectForKey:@"percent_match"];
                
                DetailViewController *detailVC = [[DetailViewController alloc]init];
                detailVC.match = match;
                detailVC.modalTransitionStyle = UIModalPresentationPopover;
                [self->_activityIndicator stopAnimating];
                [self.view setUserInteractionEnabled:YES];
                [self presentViewController:detailVC animated:YES completion:nil];
            });
        }
        
    }];
    [postDataTask resume];
}

@end
