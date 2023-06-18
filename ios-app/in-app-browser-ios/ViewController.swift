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


class ViewController: UIViewController, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler {

    
    private let OBSERVER_NAME = "appInterface"
    private var webView: WKWebView!
    private var webSession: ASWebAuthenticationSession!

    
    private func createNotifications(){
        NotificationCenter.default.addObserver(self, selector: #selector(closeInAppBrowser), name: .trustlyCloseInAppBrowser, object: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.createNotifications()
        
        // the url of your web app
        let url = URL(string: "http://localhost:3000?integrationContext=InAppBrowserNotify&urlScheme=in-app-browser-ios")!
        let reqApp = URLRequest(url: url);

        self.webView = WKWebView(
           frame: self.view.bounds,
           configuration: self.getWKWebViewConfiguration()
        )
        
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.load(reqApp)
        self.view.addSubview(self.webView)
    }
    
    private func getWKWebViewConfiguration() -> WKWebViewConfiguration {
        let userController = WKUserContentController()
        let configuration = WKWebViewConfiguration()
        let wkPreferences = WKPreferences()
        userController.add(self, name: OBSERVER_NAME)
        configuration.preferences = wkPreferences
        configuration.userContentController = userController
        return configuration
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if let data = message.body as? [String : String],
           let url = URL(string: data["url"]!) {
            if #available(iOS 13, *) {
                self.buildASWebAuthenticationSession(url: url, callbackURL: "in-app-browser-ios")
            } else {
                // handle iOS =<12 with SFAuthenticationSession
            }
        }
    }
    
    private func buildASWebAuthenticationSession(url: URL, callbackURL: String){
        webSession = ASWebAuthenticationSession(url: url, callbackURLScheme: callbackURL, completionHandler: { (url, error) in

            self.proceedToChooseAccount()

        })
        
        webSession.prefersEphemeralWebBrowserSession = true
        webSession.presentationContextProvider = self
        webSession.start()
    }
    
    @objc func closeInAppBrowser(notification: Notification){
        if webSession != nil {
            webSession.cancel()
        }
        
        self.proceedToChooseAccount()
    }
    
    private func proceedToChooseAccount(){
        self.webView.evaluateJavaScript("window.Trustly.proceedToChooseAccount();", completionHandler: nil)
    }
}

