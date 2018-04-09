import ether from "./helpers/ether";
import EVMRevert from "./helpers/EVMRevert";

const BigNumber = web3.BigNumber;
const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();
const utils = require("./utils");

const MultisigWallet = artifacts.require("MultisigWallet");

contract("MultisigWallet", accounts => {
  // owner1 is the primaryOwner
  const owner1 = accounts[0];
  const owner2 = accounts[1];
  const owner3 = accounts[2];
  const deposit = ether(1);
  const valueToSend = ether(0.1);
  var wallet, primaryOwner, owners;

  beforeEach(async () => {
    wallet = await MultisigWallet.new([owner1, owner2, owner3], 2);
    assert.ok(wallet);
    owners = await wallet.getOwners();
    primaryOwner = await wallet.getPrimaryOwner();
    const owner1Bal = await utils.balanceOf(web3, owner1);
    // Send money to wallet contract
    await new Promise((resolve, reject) =>
      web3.eth.sendTransaction(
        { to: wallet.address, value: deposit, from: owner3 },
        e => (e ? reject(e) : resolve())
      )
    );
    const balance = await utils.balanceOf(web3, wallet.address);
    assert.equal(balance.valueOf(), deposit);
  });

  describe("Confirmation", function() {
    it("is confirmed if confirmed by primary owner and has the correct number of confirmations", async () => {
      // submit transaction from non-primary owner
      var transaction = await wallet.submitTransaction(
        owner3,
        valueToSend,
        null,
        {
          from: owner2
        }
      );
      var transactionId = utils.getParamFromTxEvent(
        transaction,
        "transactionId",
        null,
        "Submission"
      );
      var confirmedBefore = await wallet.isConfirmed(transactionId);
      assert.equal(confirmedBefore, false);
      var confirmation = await wallet.confirmTransaction(transactionId, {
        from: primaryOwner
      });
      var confirmedAfter = await wallet.isConfirmed(transactionId);
      assert.equal(confirmedAfter, true);
    });

    it("is not confirmed if not confirmed by the primary owner", async () => {
      // submit transaction from non-primary owner
      var transaction = await wallet.submitTransaction(
        owner3,
        valueToSend,
        null,
        {
          from: owner2
        }
      );
      var transactionId = utils.getParamFromTxEvent(
        transaction,
        "transactionId",
        null,
        "Submission"
      );
      var confirmedBefore = await wallet.isConfirmed(transactionId);
      assert.equal(confirmedBefore, false);
      var confirmation = await wallet.confirmTransaction(transactionId, {
        from: owner3
      });
      var confirmedAfter = await wallet.isConfirmed(transactionId);
      console.log("confirmedAfter", confirmedAfter);
      assert.equal(confirmedAfter, false);
    });

    it("is not confirmed if ONLY confirmed by the primary owner", async () => {
      // submit transaction from non-primary owner
      var transaction = await wallet.submitTransaction(
        owner3,
        valueToSend,
        null,
        {
          from: primaryOwner
        }
      );
      var transactionId = utils.getParamFromTxEvent(
        transaction,
        "transactionId",
        null,
        "Submission"
      );
      var confirmed = await wallet.isConfirmed(transactionId);
      assert.equal(confirmed, false);
    });

    it("can transfer ether to destination if confirmed", async () => {
      // submit transaction from non-primary owner
      var transaction = await wallet.submitTransaction(
        owner3,
        valueToSend,
        null,
        {
          from: owner2
        }
      );
      var transactionId = utils.getParamFromTxEvent(
        transaction,
        "transactionId",
        null,
        "Submission"
      );
      var walletBalanceBefore = await utils.balanceOf(web3, wallet.address);
      var destBalanceBefore = await utils.balanceOf(web3, owner3);
      var confirmation = await wallet.confirmTransaction(transactionId, {
        from: primaryOwner
      });
      var walletBalanceAfter = await utils.balanceOf(web3, wallet.address);
      var destBalanceAfter = await utils.balanceOf(web3, owner3);
      var walletDiff = walletBalanceBefore.minus(walletBalanceAfter);
      assert.equal(walletDiff.toNumber(), valueToSend.toNumber());
      var destDiff = destBalanceAfter.minus(destBalanceBefore);
      assert.equal(destDiff.toNumber(), valueToSend.toNumber());
    });
  });
});
