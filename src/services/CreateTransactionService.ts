import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const fundsValidator = this.transactionsRepository.getBalance();

    if (type === 'outcome' && fundsValidator.total < value) {
      throw Error('Insufficient funds');
    } else if (type !== 'income' && type !== 'outcome') {
      throw Error('declined transaction, invalid type');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
    // TODO
  }
}

export default CreateTransactionService;
