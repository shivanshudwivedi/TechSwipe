import SwiftUI

struct RegistrationView: View {
    @StateObject private var authViewModel = AuthViewModel()
    
    var body: some View {
        VStack {
            TextField("Name", text: $authViewModel.name)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            TextField("Email", text: $authViewModel.email)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            SecureField("Password", text: $authViewModel.password)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            Button(action: {
                authViewModel.registerWithEmail()
            }) {
                Text("Register")
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(10)
            }
        }
        .padding()
        .navigationBarTitle("Registration")
    }
}
