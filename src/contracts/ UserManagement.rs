#[derive(Clone, Debug)]
pub enum UserRole {
    Borrower,
    Lender,
    Collaborator,
}

pub struct User {
    pub address: Address,
    pub role: UserRole,
}

pub struct UserManagement {
    users: Vec<User>,
}

impl UserManagement {
    pub fn register_user(&mut self, address: Address, role: UserRole) {
        self.users.push(User { address, role });
    }

    pub fn get_user_info(&self, address: Address) -> Option<&User> {
        self.users.iter().find(|u| u.address == address)
    }
}
