import Foundation
import FirebaseAuth
import GoogleSignIn

class AuthService {
    func isLoggedIn() -> Bool {
        return Auth.auth().currentUser!= nil
    }
    
    func loginWithGoogle(presenting viewController: UIViewController, completion: @escaping (Result<Void, Error>) -> Void) {
        guard let clientID = FirebaseApp.app()?.options.clientID else {
            completion(.failure(NSError(domain: "com.techswipe.error", code: 0, userInfo: [NSLocalizedDescriptionKey: "No valid client ID found"])))
            return
        }
        
        let configuration = GIDConfiguration(clientID: clientID)
        GIDSignIn.sharedInstance.configuration = configuration
        
        GIDSignIn.sharedInstance.signIn(with: viewController, presenting: viewController) { user, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            guard let authentication = user?.authentication,
                  let idToken = authentication.idToken else {
                completion(.failure(NSError(domain: "com.techswipe.error", code: 0, userInfo: [NSLocalizedDescriptionKey: "Unable to get ID token"])))
                return
            }
            
            let credential = GoogleAuthProvider.credential(withIDToken: idToken,
                                                           accessToken: authentication.accessToken)
            
            Auth.auth().signIn(with: credential) { result, error in
                if let error = error {
                    completion(.failure(error))
                } else {
                    completion(.success(()))
                }
            }
        }
    }
    
    func logout() {
        GIDSignIn.sharedInstance.signOut()
        try? Auth.auth().signOut()
    }
    
    func fetchCurrentUser(completion: @escaping (Result<User, Error>) -> Void) {
        guard let uid = Auth.auth().currentUser?.uid else {
            completion(.failure(NSError(domain: "com.techswipe.error", code: 0, userInfo: [NSLocalizedDescriptionKey: "User not logged in"])))
            return
        }
        
        // Fetch user details from Firestore or Realtime Database using the uid
        // Example implementation:
        let user = User(id: uid, name: "John Doe", email: "johndoe@example.com")
        completion(.success(user))
    }
}
