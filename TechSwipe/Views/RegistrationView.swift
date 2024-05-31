import SwiftUI

struct RegistrationView: View {
    @EnvironmentObject private var authViewModel: AuthViewModel
    
    var body: some View {
        VStack {
            Text("Create an Account")
                .font(.largeTitle)
            
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
                    .font(.headline)
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
