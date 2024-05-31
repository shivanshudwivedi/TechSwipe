import Foundation
import FirebaseAuth
import GoogleSignIn

class AuthViewModel: ObservableObject {
    @Published var isLoggedIn = false
    @Published var currentUser: User?
    
    private let authService = AuthService()
    
    func loginWithGoogle(presenting viewController: UIViewController, completion: @escaping (Result<Void, Error>) -> Void) {
        authService.loginWithGoogle(presenting: viewController) { [weak self] result in
            switch result {
            case .success:
                self?.isLoggedIn = true
                self?.fetchCurrentUser()
                completion(.success(()))
            case .failure(let error):
                completion(.failure(error))
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
