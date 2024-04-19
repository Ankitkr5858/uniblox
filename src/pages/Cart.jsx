import React, { useState, useEffect } from "react";
import CartCard from "../components/CartCard";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkoutCart } from "../redux/slices/CartSlice";

import toast from "react-hot-toast";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    let totalPrice = cart.items.reduce(
      (acc, curr) => acc + curr.retail_price_cents * curr.qty,
      0
    );
    setTotal(totalPrice);
    if (discountApplied) {
      setDiscountedTotal(totalPrice * 0.9);
    } else {
      setDiscountedTotal(0);
    }
  }, [cart.items, discountApplied]);

  const applyDiscount = () => {
    setDiscountApplied((pre) => {
      const newVal = !pre;

      toast.success(`Discount ${newVal ? "Applied" : "Cancel"} Successfully`);
      return newVal;
    });
  };

  const checkout = () => {
    toast.success("Order Placed Successfully");
    localStorage.removeItem("localCart");
    dispatch(checkoutCart());
    navigate("/");
  };

  const isNthOrder = (cart, n) => {
    return cart.orderCount % n === 0;
  };

  return (
    <div>
      <div>
        <div className="w-full min-h-screen flex mx-[30px] md:mx-[100px]">
          <div className="flex flex-col lg:flex-row gap-x-6 gap-y-10">
            <div className="flex flex-col">
              <div className="overflow-auto max-h-[calc(100vh_-_18rem)] px-2">
                {cart.items.map((cartItem) => (
                  <CartCard key={cartItem.id} item={cartItem} />
                ))}
              </div>

              {cart && cart.items?.length > 0 && isNthOrder(cart, 2) && (
                <div className="h-24 w-[310px]  md:h-24 md:w-[600px] bg-slate-100 dark:bg-[#1f] rounded-2xl hover:shadow-lg mt-[40px] md:mt-[20px] md:pb-4 ">
                  <div className="flex justify-between  items-center  p-[30px]">
                    <span>Available Discount 10%</span>
                    <button
                      className="bg-[#2a2a2a] text-white px-8 py-2 rounded-md cursor-pointer hover:bg-black"
                      onClick={applyDiscount}
                    >
                      {discountApplied ? "Cancel" : "Apply"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {cart.items.length === 0 ? (
              <div className="min-w-[320px] md:min-w-[1280px] md:max-h-[100px] flex justify-center">
                <div className="flex flex-col justify-around gap-y-4 md:gap-y-10">
                  <div className="">
                    <h1 className="text-4xl dark:text-red-500 md:text-4xl font-semibold">
                      Cart is Empty !!
                    </h1>
                  </div>
                  <div className="flex justify-center">
                    <button className="bg-[#2a2a2a] w-[200px] text-white p-4 rounded-md cursor-pointer hover:bg-black">
                      <Link to="/explore">Shop Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" h-[200px] mt-[40px] w-[300px] md:w-[600px] p-4 flex flex-col justify-between">
                <div>
                  <h1 className="text-xl md:text-4xl font-bold text-slate-500">
                    Total Items : {cart.length}
                  </h1>
                  <h1
                    className={`text-xl md:text-4xl font-bold text-slate-500 ${
                      discountApplied ? "line-through" : ""
                    }`}
                  >
                    Total Price {total} Rs
                  </h1>

                  {discountApplied && (
                    <h1 className="text-xl md:text-4xl font-bold text-[#5e5b5b]">
                      After Discount Price {discountedTotal} Rs
                    </h1>
                  )}
                </div>
                <div>
                  <button
                    className="bg-[#2a2a2a] w-full text-white p-2 rounded-md cursor-pointer hover:bg-black"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
