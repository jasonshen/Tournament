#import <UIKit/UIKit.h>
#import "Match.h"

@interface DetailViewController : UIViewController <NSURLSessionDelegate>
@property (nonatomic, retain) Match *match;
@property (weak, nonatomic) IBOutlet UIImageView *photo;
@property (weak, nonatomic) IBOutlet UILabel *name;
@property (weak, nonatomic) IBOutlet UILabel *percent;
@property (weak, nonatomic) IBOutlet UIButton *reportButton;
@property (nonatomic, retain) UIActivityIndicatorView *activityIndicator;
@property (nonatomic, retain) UIAlertController *ac;
@end
