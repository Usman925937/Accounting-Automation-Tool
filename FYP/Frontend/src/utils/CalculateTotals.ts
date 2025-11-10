import type { JournalEntry } from "../store/types";

export const calculateTotals = (entries: JournalEntry[]) => {
    const totals = {
        netIncome: 0,
        oci: 0,
        assets: 0,
        liabilities: 0,
        totalEquity: 0,
        currentAssets: 0,
        nonCurrentAssets: 0,
        currentLiabilities: 0,
        nonCurrentLiabilities: 0,
        revenue: 0,
        expenses: 0
    };

    for (const entry of entries) {
        const { debitAccount, creditAccount, amount } = entry;
        
        // Debit side impact
        if (debitAccount.category === 'Asset') totals.assets += amount;
        if (debitAccount.category === 'Liability') totals.liabilities -= amount;
        if (debitAccount.category === 'Equity') totals.totalEquity -= amount;
        
        if (debitAccount.category === 'Revenue' && debitAccount.financialStatement === 'Income Statement') totals.netIncome -= amount;
        if (debitAccount.category === 'Expense' && debitAccount.financialStatement === 'Income Statement') totals.netIncome -= amount;
        
        if (debitAccount.category === 'Revenue' && debitAccount.financialStatement === 'Income Statement') totals.revenue -= amount;
        if (debitAccount.category === 'Expense' && debitAccount.financialStatement === 'Income Statement') totals.expenses += amount;
        
        // Credit side impact
        if (creditAccount.category === 'Asset') totals.assets -= amount;
        if (creditAccount.category === 'Liability') totals.liabilities += amount;
        if (creditAccount.category === 'Equity') totals.totalEquity += amount;
        
        if (creditAccount.category === 'Revenue' && creditAccount.financialStatement === 'Income Statement') totals.netIncome += amount;
    
        if (creditAccount.category === 'Revenue' && creditAccount.financialStatement === 'Income Statement') totals.revenue += amount;
        if (creditAccount.category === 'Expense' && creditAccount.financialStatement === 'Income Statement') totals.expenses -= amount;
        
        // current and non-current
        // debit side
        if (debitAccount.subCategory === 'Current Asset') totals.currentAssets = totals.currentAssets + amount;
        if (debitAccount.subCategory === 'Non-Current Asset') totals.nonCurrentAssets = totals.nonCurrentAssets + amount;
        if (debitAccount.subCategory === 'Current Liability') totals.currentLiabilities = totals.currentLiabilities - amount;
        if (debitAccount.subCategory === 'Non-Current Liability') totals.nonCurrentLiabilities = totals.nonCurrentLiabilities - amount;
        
        // credit side
        if (creditAccount.subCategory === 'Current Asset') totals.currentAssets = totals.currentAssets - amount;
        if (creditAccount.subCategory === 'Non-Current Asset') totals.nonCurrentAssets = totals.nonCurrentAssets - amount;
        if (creditAccount.subCategory === 'Current Liability') totals.currentLiabilities = totals.currentLiabilities + amount;
        if (creditAccount.subCategory === 'Non-Current Liability') totals.nonCurrentLiabilities = totals.nonCurrentLiabilities + amount;
    
        // oci
        if (debitAccount.financialStatement === 'Comprehensive Income') totals.oci -= amount;
        if (creditAccount.financialStatement === 'Comprehensive Income') totals.oci += amount;
    }

    // Retained earnings (profit) flow into equity
    totals.totalEquity += totals.netIncome;

    // accumulated oci
    totals.totalEquity += totals.oci;


    return totals;
};
