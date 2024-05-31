import SwiftUI
import Firebase
import GoogleSignIn

@main
struct TechSwipeApp: App {
    @StateObject private var authViewModel = AuthViewModel()
    
    init() {
        // Configure Firebase
        FirebaseApp.configure()
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(authViewModel)
        }
    }
}

// MARK: - Handle Google Sign-In URL callback
extension TechSwipeApp {
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        return GIDSignIn.sharedInstance.handle(url)
    }
}
