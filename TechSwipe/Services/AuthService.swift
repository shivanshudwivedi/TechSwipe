import Foundation
import FirebaseAuth

class AuthService {
    func isLoggedIn() -> Bool {
        return Auth.auth().currentUser != nil
    }
    
    func loginWithEmail(email: String, password: String, completion: @escaping (Result<Void, Error>) -> Void) {
        Auth.auth().signIn(withEmail: email, password: password) { _, error in
            if let error = error {
                completion(.failure(error))
            } else {
                completion(.success(()))
            }
        }
    }
    
    func registerWithEmail(email: String, password: String, name: String, completion: @escaping (Result<Void, Error>) -> Void) {
        Auth.auth().createUser(withEmail: email, password: password) { authResult, error in
            if let error = error {
                completion(.failure(error))
            } else {
                // Save user's name to Firestore or Realtime Database
                completion(.success(()))
            }
        }
    }
    
    func logout() {
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
