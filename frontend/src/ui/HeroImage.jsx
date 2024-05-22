import { Carousel } from "antd";
import useGetTopProduct from "../features/products/useGetTopProduct";

const contentStyle = {
  height: "430px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  borderRadius: "25px",
};
function HeroImage() {
  const { topProducts, isLoading } = useGetTopProduct();

  if (isLoading) return;
  return (
    <>
      <Carousel autoplay>
        {topProducts?.map((item) => (
          <div key={item._id}>
            <img src={item.image} className="w-full" style={contentStyle} />
          </div>
        ))}
      </Carousel>
    </>
  );
}
export default HeroImage;
