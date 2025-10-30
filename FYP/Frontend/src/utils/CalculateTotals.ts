import type { JournalEntry } from "../store/types";

export const calculateTotals = (entries: JournalEntry[]) => {
    const totals = {
        netIncome: 0,
        assets: 0,
        liabilities: 0,
        totalEquity: 0,
    };

    for (const entry of entries) {
        const { debitAccount, creditAccount, amount } = entry;

        // Debit side impact
        if (debitAccount.category === 'Asset') totals.assets += amount;
        if (debitAccount.category === 'Expense' && debitAccount.financialStatement === 'Income Statement') totals.netIncome -= amount;
        if (debitAccount.category === 'Liability') totals.liabilities -= amount;
        if (debitAccount.category === 'Equity') totals.totalEquity -= amount;
        if (debitAccount.category === 'Revenue' && debitAccount.financialStatement === 'Income Statement') totals.netIncome -= amount;

        // Credit side impact
        if (creditAccount.category === 'Asset') totals.assets -= amount;
        if (creditAccount.category === 'Liability') totals.liabilities += amount;
        if (creditAccount.category === 'Equity') totals.totalEquity += amount;
        if (creditAccount.category === 'Revenue' && creditAccount.financialStatement === 'Income Statement') totals.netIncome += amount;
    }

    // Retained earnings (profit) flow into equity
    totals.totalEquity += totals.netIncome;

    return totals;
};
