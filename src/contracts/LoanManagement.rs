#[derive(Default)]
pub struct Loan {
    pub loan_id: u64,
    pub borrower: Address,
    pub amount: u128,
    pub funded: u128,
    pub interest_rate: u64,
    pub duration: u64,
    pub status: LoanStatus,
}

#[derive(Clone, Debug)]
pub enum LoanStatus {
    Pending,
    Funded,
    InRepayment,
    Completed,
    Defaulted,
}

pub struct LoanManagement {
    loans: Vec<Loan>,
    next_loan_id: u64,
}

impl LoanManagement {
    pub fn create_loan_request(&mut self, borrower: Address, amount: u128, interest_rate: u64, duration: u64) -> u64 {
        let loan = Loan {
            loan_id: self.next_loan_id,
            borrower,
            amount,
            funded: 0,
            interest_rate,
            duration,
            status: LoanStatus::Pending,
        };
        self.loans.push(loan);
        self.next_loan_id += 1;
        self.next_loan_id - 1
    }

    pub fn fund_loan(&mut self, loan_id: u64, amount: u128) {
        let loan = self.loans.iter_mut().find(|l| l.loan_id == loan_id).unwrap();
        loan.funded += amount;
        if loan.funded >= loan.amount {
            loan.status = LoanStatus::Funded;
        }
    }

    pub fn repay_loan(&mut self, loan_id: u64, amount: u128) {
        let loan = self.loans.iter_mut().find(|l| l.loan_id == loan_id).unwrap();
        if loan.status == LoanStatus::Funded || loan.status == LoanStatus::InRepayment {
            loan.amount -= amount;
            if loan.amount == 0 {
                loan.status = LoanStatus::Completed;
            }
        }
    }
}
