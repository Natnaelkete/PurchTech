import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keyWords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyWords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to PurchTech",
  description: "We sell the best products for cheap",
  keyWords: "electronics, buy electronics, cheap electronics",
};

export default Meta;
