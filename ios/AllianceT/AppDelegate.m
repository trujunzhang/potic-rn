/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 */


#import "AppDelegate.h"

#import "RCTRootView.h"
#import "RCTPushNotificationManager.h"

#import <Parse/Parse.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSDictionary * remoteNotification = launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey];
  if(remoteNotification){
    NSString *remoteMessage = remoteNotification[@"message"];
    
    UIAlertController * ac = [UIAlertController alertControllerWithTitle:@"Received on launch" message:remoteMessage preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *aa = [UIAlertAction actionWithTitle:@"Okey" style:UIAlertActionStyleDefault handler:nil];
    
    [ac addAction:aa];
    
    dispatch_async(dispatch_get_main_queue(),^{
      [application.keyWindow.rootViewController presentViewController:ac animated:YES completion:nil];
    });
  }
  
  
  [Parse initializeWithConfiguration:[ParseClientConfiguration configurationWithBlock:^(id <ParseMutableClientConfiguration> _Nonnull configuration) {
    // Add your Parse applicationId:
    configuration.applicationId = @"zU5955fjYoDbG1EC0wY9RUb8zZYDtbivvUGuWZMv";
    
    // Uncomment and add your clientKey (it's not required if you are using Parse Server):
    configuration.clientKey = @"TSmgaszYl7rNEZd6otpcGpPCo9usyt4aY8dv9r9h";
    
    // Uncomment the following line and change to your Parse Server address;
    configuration.server = @"https://parseapi.back4app.com/";
    
    // Enable storing and querying data from Local Datastore. Remove this line if you don't want to
    // use Local Datastore features or want to use cachePolicy.
    configuration.localDatastoreEnabled = YES;
  }]];
  
  UIUserNotificationType userNotificationTypes = (UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound);
  UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:userNotificationTypes categories:nil];
  [application registerUserNotificationSettings:settings];
  [application registerForRemoteNotifications];
  
  
  
  
  
  NSURL *jsCodeLocation;
  
#ifdef DEBUG
  NSString *ip = [[NSString stringWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"ip" ofType:@"txt"] encoding:NSUTF8StringEncoding error:nil] stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"\n"]];
  
  if (!ip) {
    ip = @"192.168.1.104";
  }
  
  jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://%@:8081/index.ios.bundle?platform=ios&dev=true", ip]];
#else
  jsCodeLocation = [CodePush bundleURL];
#endif
  
  
  
  // Use this to channge the tint colo of the entere TabBar
  [[UITabBar appearance] setTintColor:[UIColor colorWithRed:(238 / 256.0) green:(187 / 256.0) blue:(8 / 256.0) alpha:(1.0)]];
  
  // This change only a background color(invalid)
  //[[UITabBar appearance] setBackgroundColor:[UIColor colorWithRed:(255/256.0) green:(255/256.0) blue:(255/256.0) alpha:1.0]];
  
  UIImage *tabBarBackground = [UIImage imageNamed:@"tabbar"];
  [[UITabBar appearance] setBackgroundImage:tabBarBackground];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"AllianceT"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  NSArray *objects = [[NSBundle mainBundle] loadNibNamed:@"LaunchScreen" owner:self options:nil];
  UIImageView *loadingView = [[[objects objectAtIndex:0] subviews] objectAtIndex:0];
  loadingView = [[UIImageView alloc] initWithImage:[loadingView image]];
  loadingView.frame = [UIScreen mainScreen].bounds;
  
  rootView.loadingView = loadingView;
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [[UIApplication sharedApplication] setStatusBarHidden:NO];
  [self.window makeKeyAndVisible];
  
  return YES;
}


- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];


  PFInstallation *currentInstallation = [PFInstallation currentInstallation];
  [currentInstallation setDeviceTokenFromData:deviceToken];
  [currentInstallation addUniqueObject:@"AllianceTChannel" forKey:@"channels"];
  [currentInstallation saveInBackground];

  [PFPush subscribeToChannelInBackground:@"AllianceTChannel" block:^(BOOL succeeded, NSError *error) {
    if (succeeded) {
      NSLog(@"ParseStarterProject successfully subscribed to push notifications on the broadcast channel.");
    } else {
      NSLog(@"ParseStarterProject failed to subscribe to push notifications on the broadcast channel.");
    }
  }];
}


- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  if (error.code == 3010) {
    NSLog(@"Push notifications are not supported in the iOS Simulator.");
  } else {
    // show some alert or otherwise handle the failure to register.
    NSLog(@"application:didFailToRegisterForRemoteNotificationsWithError: %@", error);
  }
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [RCTPushNotificationManager didReceiveRemoteNotification:userInfo];
  
  if(application.applicationState == UIApplicationStateActive){
    [PFPush handlePush:userInfo];
  }
  
  [[PFAnalytics trackAppOpenedWithRemoteNotificationPayload:userInfo] continueWithBlock:^id _Nullable(BFTask<NSNumber *> * _Nonnull task) {
    NSLog(@"%@", task);
    NSLog(@"%@ %@ %d", task.result, task.error, task.cancelled);
    return nil;
  }];
  
}


@end
