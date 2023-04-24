//
//  Extensions.swift
//  in-app-browser-ios
//
//  Created by Luke Vance on 1/11/23.
//  Copyright © 2023 Pedro Paulo Abdenor. All rights reserved.
//

import Foundation
import AuthenticationServices

extension ViewController: ASWebAuthenticationPresentationContextProviding {
    func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        return ASPresentationAnchor()
    }
}

extension Notification.Name{
    static let trustlyCloseInAppBrowser = Notification.Name("trustly.close.inAppBrowser")

}
