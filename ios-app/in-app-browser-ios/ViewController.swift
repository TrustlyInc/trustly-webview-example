//
//  ViewController.swift
//
//  Copyright © 2022 Trustly, Inc. All rights reserved.
//

import Foundation
import UIKit
import WebKit
import AuthenticationServices
// necessary for compatibility with iOS 12 and under
import SafariServices


class ViewController: UIViewController, WKNavigationDelegate, WKUIDelegate {
    
    private var webSession: ASWebAuthenticationSession!
    
    override func viewDidLoad() {
        super.viewDidLoad()
                
        // the url of your web app
        let url = URL(string: "http://10.200.206.129:3001?integrationContext=FullInAppBrowser&urlScheme=in-app-browser-ios")!
        self.buildASWebAuthenticationSession(url: url, callbackURL: "in-app-browser-ios")
    }
    
    private func buildASWebAuthenticationSession(url: URL, callbackURL: String){
        webSession = ASWebAuthenticationSession(url: url, callbackURLScheme: callbackURL, completionHandler: { (url, error) in
        })
        
        webSession.prefersEphemeralWebBrowserSession = true
        webSession.presentationContextProvider = self
        webSession.start()
    }
    
}

