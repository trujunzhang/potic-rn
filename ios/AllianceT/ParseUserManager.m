//
//  ParseUserManager.m
//  snowflake
//
//  Created by djzhang on 5/25/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "ParseUserManager.h"
#import <React/RCTLog.h>
#import <Parse/Parse.h>

@implementation ParseUserManager

// To export a module named CalendarManager
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(login:(NSString *)username password:(NSString *)password)
{
  
  [PFUser logInWithUsernameInBackground:username password:password
                                  block:^(PFUser *user, NSError *error) {
                                    if (user) {
                                      RCTLogInfo(@"Login to create an parse user successfully!%@", user.objectId);
                                      
                                      // Do stuff after successful login.
                                      PFInstallation * currentInstallation = [PFInstallation currentInstallation];
                                      [currentInstallation setObject:user forKey:@"user"];
                                      [currentInstallation saveInBackground];
                                      
                                    } else {
                                      // The login failed. Check error to see why.
                                      RCTLogInfo(@"Login failed!%@", error);
                                    }
                                  }];
}

RCT_EXPORT_METHOD(logOut)
{
  
  [PFUser logOutInBackgroundWithBlock:^(NSError * _Nullable error) {
    // Do stuff after successful login.
    PFInstallation * currentInstallation = [PFInstallation currentInstallation];
    [currentInstallation removeObjectForKey:@"user"];
    [currentInstallation saveInBackground];

  }];
}

RCT_EXPORT_METHOD(currentUserId:(RCTResponseSenderBlock)callback)
{
  PFUser * user =   [PFUser currentUser];
  
  NSString * userId = NULL;
  if(user){
    userId = [user objectId];
  }
  
   callback(@[[NSNull null], userId]);
}

@end
