import SwiftUI
import FirebaseCore

@main
struct TechSwipeApp: App {
    init() {
        FirebaseApp.configure()
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}


