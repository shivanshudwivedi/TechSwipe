import Foundation

struct CartItem: Identifiable {
    let id: String
    let product: Product
    var quantity: Int
}
