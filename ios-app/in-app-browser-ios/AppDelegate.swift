//
//  AppDelegate.swift
//
//  Copyright © 2022 Trustly, Inc. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {



    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }
    
    
    func application(_ application: UIApplication,
                     open url: URL,
                     options: [UIApplication.OpenURLOptionsKey : Any] = [:] ) -> Bool {
        
        self.handleURL(url: url)
        return true
    }
    
    func handleURL(url: URL) {

        // A host, a path and query params are expected, else the URL will not be handled.
        guard let components = NSURLComponents(url: url, resolvingAgainstBaseURL: true),
            let host = components.host,
            let _ = components.path,
            let params = components.queryItems else {
                NSLog("Invalid URL. Host, path and query params are expected")
                return
        }
        
        NSLog("host: \(host)")
        
        for (index, pathComponent) in url.pathComponents.enumerated() {
            NSLog("pathComponent \(index): \(pathComponent)")
        }
        
        for query in params {
            if let value = query.value {
                NSLog("Query param \(query.name): \(value)")
                continue
            }
            
            NSLog("Query param \(query.name) has no value")
        }
    }


}

