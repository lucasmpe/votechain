import { Server, Keypair, TransactionBuilder, Operation, Asset } from 'stellar-sdk';
import StellarAccount from '../entities/StellarAccount.js';
import issuerKeyPair from './issuer.js';
import fetch from 'node-fetch';
export default class StellarService {

  constructor() {
    this.server = new Server("https://horizon-testnet.stellar.org");
  };

  async createKeypair(id) {
    const kp = Keypair.random();
    return new StellarAccount(id, kp.publicKey(), kp.secret());
  };

  async createAccount(entityAccount, initialAmount = '10') {
    const issuerAccount = await this.server.loadAccount(issuerKeyPair.publicKey());

    const tx = new TransactionBuilder(issuerAccount, {
      fee: await this.server.fetchBaseFee(),
      networkPassphrase: 'Test SDF Network ; September 2015',
    })
      .addOperation(Operation.createAccount({
        destination: entityAccount.publicKey,
        startingBalance: initialAmount
      }))
      .setTimeout(30)
      .build();

    console.log(tx.toXDR());

    tx.sign(issuerKeyPair);

    try {
      const txResult = await this.server.submitTransaction(tx);
      console.log(txResult);
    } catch (e) {
      console.error(e);
    }
  };

  async issueAnAsset(entityAccount, amount, assetCode) {
    const entityAccountKp = Keypair.fromSecret(entityAccount.secret);
    const issuerAccount = await this.server.loadAccount(issuerKeyPair.publicKey());
    const newAsset = new Asset(assetCode, issuerKeyPair.publicKey());

    const tx = new TransactionBuilder(issuerAccount, {
      fee: await this.server.fetchBaseFee(),
      networkPassphrase: 'Test SDF Network ; September 2015',
    })
      .addOperation(Operation.changeTrust({
        source: entityAccount.publicKey,
        asset: newAsset,
      }))
      .addOperation(Operation.payment({
        amount: amount.toString(),
        asset: newAsset,
        destination: entityAccount.publicKey,
      }))
      .setTimeout(30)
      .build();

    console.log(tx.toXDR());

    tx.sign(entityAccountKp);
    tx.sign(issuerKeyPair);

    try {
      const txResult = await this.server.submitTransaction(tx);
      console.log(txResult);
    } catch (e) {
      console.error(e);
    }
  };

  async makePayment(entityEmiterAccount, entityReceiverAccount, amount, assetCode) {
    const emiterAccountKp = Keypair.fromSecret(entityEmiterAccount.secret);
    const receiverAccountKp = Keypair.fromSecret(entityReceiverAccount.secret);
    const emitAccount = await this.server.loadAccount(emiterAccountKp.publicKey());
    const asset = new Asset(assetCode, issuerKeyPair.publicKey());

    const tx = new TransactionBuilder(emitAccount, {
      fee: await this.server.fetchBaseFee(),
      networkPassphrase: 'Test SDF Network ; September 2015',
    })
      .addOperation(Operation.changeTrust({
        source: receiverAccountKp.publicKey(),
        asset: asset,
      }))
      .addOperation(Operation.payment({
        amount: amount.toString(),
        asset: asset,
        destination: receiverAccountKp.publicKey(),
      }))
      .setTimeout(30)
      .build();

    console.log(tx.toXDR());

    tx.sign(receiverAccountKp);
    tx.sign(emiterAccountKp);

    try {
      const txResult = await this.server.submitTransaction(tx);
      console.log(txResult);
    } catch (e) {
      console.error(e);
    }
  };

  async getPayments(receiversAccount) {
    let payments = [];
   
    try {
      for (const account of receiversAccount) {
        const response = await fetch(
          `https://horizon-testnet.stellar.org/accounts/${account.publicKey}/payments?order=desc`,
        );
        const { _embedded } = await response.json();

        for (const record of _embedded.records) {
          const {
            id,
            asset_code: option,
            from: consorcio,
            to: consorcista,
            amount: vt
          } = record;

          payments.push({ id, option, consorcio, consorcista, vt });
        }
      }
      return payments;
    } catch (error) {
      console.error("ERROR!", error);
    }

  };

}
