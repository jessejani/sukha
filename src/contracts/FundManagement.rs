pub struct Collateral {
    pub loan_id: u64,
    pub borrower: Address,
    pub amount: u128,
    pub is_locked: bool,
}

pub struct FundManagement {
    pub balances: std::collections::HashMap<Address, u128>,
    pub collaterals: Vec<Collateral>,
}

impl FundManagement {
    pub fn deposit_funds(&mut self, user: Address, amount: u128) {
        let balance = self.balances.entry(user).or_insert(0);
        *balance += amount;
    }

    pub fn withdraw_funds(&mut self, user: Address, amount: u128) -> bool {
        if let Some(balance) = self.balances.get_mut(&user) {
            if *balance >= amount {
                *balance -= amount;
                return true;
            }
        }
        false
    }

    pub fn lock_collateral(&mut self, loan_id: u64, borrower: Address, amount: u128) {
        self.collaterals.push(Collateral {
            loan_id,
            borrower,
            amount,
            is_locked: true,
        });
    }

    pub fn release_collateral(&mut self, loan_id: u64) {
        if let Some(collateral) = self.collaterals.iter_mut().find(|c| c.loan_id == loan_id) {
            collateral.is_locked = false;
        }
    }
}
