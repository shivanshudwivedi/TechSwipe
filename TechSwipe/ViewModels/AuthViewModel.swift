import Foundation
import FirebaseAuth

class AuthViewModel: ObservableObject {
    @Published var isLoggedIn = false
    @Published var email = ""
    @Published var password = ""
    @Published var name = ""
    @Published var currentUser: User?
    
    private let authService = AuthService()
    
    func loginWithEmail() {
        authService.loginWithEmail(email: email, password: password) { [weak self] result in
            switch result {
            case .success:
                self?.isLoggedIn = true
                self?.fetchCurrentUser()
            case .failure(let error):
                print("Error logging in: \(error)")
            }
        }
    }
    
    func registerWithEmail() {
        authService.registerWithEmail(email: email, password: password, name: name) { [weak self] result in
            switch result {
            case .success:
                self?.isLoggedIn = true
                self?.fetchCurrentUser()
            case .failure(let error):
                print("Error registering: \(error)")
            }
        }
    }
    
    func logout() {
        authService.logout()
        isLoggedIn = false
        currentUser = nil
    }
    
    func fetchCurrentUser() {
        authService.fetchCurrentUser { [weak self] result in
            switch result {
            case .success(let user):
                self?.currentUser = user
            case .failure(let error):
                print("Error fetching current user: \(error)")
            }
        }
    }
}
