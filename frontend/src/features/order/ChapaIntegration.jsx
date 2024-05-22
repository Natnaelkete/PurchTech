import { Button, Input, Modal, Select, Result } from "antd";
import useChapaPayment from "./useChapaPayment";
import { useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { v4 as uuid4 } from "uuid";

const PaymentComponent = () => {
  const { mutate: initiatePayment, isLoading } = useChapaPayment();
  const [modal, setModal] = useState({
    open: false,
    success: false,
    error: false,
  });
  const [input, setInput] = useState({
    fName: "",
    lName: "",
    email: "",
    pNumber: "",
    amount: "",
    currency: "ETB",
  });
  const tx_ref = uuid4();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // const paymentData = {
    //   amount: input.amount,
    //   currency: input.currency,
    //   email: input.email,
    //   first_name: input.fName,
    //   last_name: input.lName,
    //   phone_number: input.pNumber,
    //   tx_ref: tx_ref,
    //   callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
    //   // return_url: "https://http:localhost:/",
    // };

    initiatePayment({
      amount: input.amount,
      currency: input.currency,
      email: input.email,
      first_name: input.fName,
      last_name: input.lName,
      phone_number: input.pNumber,
      tx_ref: tx_ref,
    });
  };

  return (
    <div>
      <>
        <Button
          type="primary"
          className="mt-2"
          onClick={() => setModal((prev) => ({ ...prev, open: true }))}
        >
          Pay Now With Chapa
        </Button>
        <Modal
          title={<p className="text-center fs-5 m-0">Payment Details</p>}
          open={modal.open}
          maskClosable={false}
          footer={[
            <Button
              key="cancel"
              disabled={isLoading}
              onClick={() => {
                setModal((prev) => ({ ...prev, open: false }));
              }}
              type="primary"
              danger
            >
              Cancel
            </Button>,
            <Button
              key="ok"
              disabled={isLoading}
              onClick={() => {
                document.getElementById("submit").click();
              }}
              type="primary"
            >
              Ok
            </Button>,
          ]}
        >
          <form onSubmit={handlePayment}>
            <label htmlFor="fName">First Name</label>
            <Input
              name="fName"
              value={input.fName}
              onChange={handleChange}
              prefix={<UserOutlined className="site-form-item-icon" />}
              id="fName"
            />
            <label htmlFor="lName">Last Name</label>
            <Input
              name="lName"
              value={input.lName}
              onChange={handleChange}
              prefix={<UserOutlined className="site-form-item-icon" />}
              id="lName"
            />
            <label htmlFor="email">Email</label>
            <Input
              name="email"
              value={input.email}
              onChange={handleChange}
              type="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              id="email"
            />
            <label htmlFor="pNumber">Phone Number</label>
            <Input
              name="pNumber"
              value={input.pNumber}
              onChange={handleChange}
              type="tel"
              required
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              id="pNumber"
            />
            <label htmlFor="amount">Amount</label>
            <Input
              name="amount"
              value={input.amount}
              onChange={handleChange}
              type="number"
              prefix={<MoneyCollectOutlined />}
              min="1"
              id="amount"
              required
            />
            <label htmlFor="currency">Currency</label>
            <Select
              style={{ width: "100%" }}
              className="d-block"
              defaultValue="ETB"
              id="currency"
              options={[
                { value: "ETB", label: "ETB" },
                { value: "USD", label: "USD" },
              ]}
              onChange={(value) => {
                setInput({ ...input, currency: value });
              }}
            />
            <button
              id="submit"
              hidden
              htmltype="submit"
              type="primary"
            ></button>
          </form>
        </Modal>
        <Modal
          title={<p className="text-center fs-5 m-0">Success</p>}
          open={modal.success}
          closable={false}
          footer={null}
        >
          <Result
            status="success"
            title="Successfully Uploaded Payment Details"
            subTitle="You will be redirected to the payment page"
          />
        </Modal>
        <Modal
          title={<p className="text-center fs-5 m-0">Error</p>}
          open={modal.error}
          closable={true}
          maskClosable={true}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setModal((prev) => ({ ...prev, error: false }));
              }}
              type="primary"
              danger
            >
              Cancel
            </Button>,
            <Button
              key="ok"
              onClick={() => {
                setModal((prev) => ({ ...prev, error: false }));
              }}
              type="primary"
            >
              Continue
            </Button>,
          ]}
        >
          <Result status="error" title="Error Uploading Payment Details" />
        </Modal>
      </>
    </div>
  );
};

export default PaymentComponent;
