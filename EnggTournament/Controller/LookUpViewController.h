#import <UIKit/UIKit.h>
#import "Match.h"
#import "DetailViewController.h"

@interface LookUpViewController : UIViewController <UINavigationControllerDelegate,UIImagePickerControllerDelegate, NSURLSessionDelegate>

@property (weak, nonatomic) IBOutlet UIImageView *imageToLookUp;
@property (weak, nonatomic) IBOutlet UIButton *lookUpButton;
@property (nonatomic, retain) UIActivityIndicatorView *activityIndicator;
@property (nonatomic, retain) UIImagePickerController *picker;
@property (nonatomic, retain) UIAlertController *ac;
@end
