import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const actualValue = this.transactions.reduce(
      (accumulator: Balance, inValue: Transaction) => {
        accumulator[inValue.type] += inValue.value;
        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    actualValue.total = actualValue.income - actualValue.outcome;

    return actualValue;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
