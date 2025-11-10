
// account type
export type Account = {
    _id: string,
    accountName: string,
    accountType: string,
    balance: number,
    category: string,
    subCategory: string,
    financialStatement: string,
    cashFlowSection: string,
    yearlyBalances: [{ financialYear: string, openingBalance: number, closingBalance: number }]
};

// journal entry type
export type JournalEntry = {
    _id: string,
    date: string,
    description: string,
    debitAccount: {
        accountName: string,
        accountType: string,
        category: string,
        subCategory: string,
        financialStatement: string
    },
    creditAccount: {
        accountName: string,
        accountType: string,
        category: string,
        subCategory: string,
        financialStatement: string
    },
    amount: number,
    financialYear: string,
}

// financial year type
export type FinancialYear = {
    _id: string,
    name: string,
    startDate: string,
    endDate: string,
    isActive: boolean
}