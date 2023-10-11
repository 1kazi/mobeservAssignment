import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import tree from "../images/tree.jpeg";
import defaultImage from "../images/default.png";
import { Button, Image, Modal } from "react-bootstrap";
import { FaShare } from "react-icons/fa";

const tabsName = [
  "DASHBOARD",
  "DIAGNOSTICS",
  "DESIGN ILT/VILT",
  "DELIVERY",
  "ASSESSOR",
  "MY CERTIFICATES",
  "POLICY",
];

export default function Navtab({ certificates, testimonial, search = "" }) {
  const [selected, setSelected] = useState("MY CERTIFICATES");
  const [pending, setPending] = useState([]);
  const [approve, setApprove] = useState([]);
  const [show, setShow] = useState(false);
  const [imagepath, setImagepath] = useState(null);

  useEffect(() => {
    // console.log(search);
    const pending1 = testimonial?.pending?.filter((item) =>
      item?.user?.name?.toLowerCase().includes(search?.toLowerCase().trim())
    );
    // console.log(pending1);
    const approve1 = testimonial?.approved?.filter((item) =>
      item?.user?.name?.toLowerCase().includes(search?.toLowerCase().trim())
    );
    if (search.trim() !== "") {
      setPending(pending1);
      setApprove(approve1);
    } else {
      setPending(testimonial?.pending);
      setApprove(testimonial?.approved);
    }
  }, [search, testimonial]);

  function selectHandler(value) {
    setSelected(value);
  }
  function accpetHandler(id) {
    // console.log(pending?.length ? "state" : "props,");
    let newPending = pending?.filter((item) => item.id !== id);
    let newPendingAdd = pending?.filter((item) => item.id === id);
    console.log(pending);
    console.log(newPending);
    setPending(newPending);
    setApprove([...approve, ...newPendingAdd]);
    // console.log("add in aprove obje", newPendingAdd);
  }
  function reajectHandler(id) {
    let newPending = pending?.filter((item) => item.id !== id);
    console.log(newPending);
    setPending(newPending);
  }

  return (
    <div className="main-tab-section">
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        className="show-active-images"
        keyboard={false}
      >
        <Modal.Body>
          <Image
            src={imagepath || tree}
            alt="image"
            className="modal-active-image"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary mt-4" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Tabs
        defaultActiveKey={selected}
        id="uncontrolled-tab-example"
        className="mb-3 top-text-section"
        onSelect={selectHandler}
      >
        {tabsName?.map((item, i) => {
          return (
            <Tab key={i} eventKey={item} title={item}>
              {item === "MY CERTIFICATES" && (
                <div className="">
                  <section className="my-certificate-section">
                    <h4 className="certificate-heading mb-3 fw-semibold">
                      MY Certificate
                    </h4>
                    <div className="certificate-slider w-100">
                      {certificates?.map((item, i) => {
                        return (
                          <Image
                            src={item.isActive ? item?.thumbnail : defaultImage}
                            alt="certificate"
                            className="cdrtificate-image pointer"
                            onClick={() => {
                              if (item.isActive) {
                                setShow(true);
                                setImagepath(item?.thumbnail);
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  </section>
                  <section className="my-tab-section">
                    <h4 className="certificate-heading mb-3 mt-3 fw-semibold">
                      MY Textimonials
                    </h4>
                    <h5 className="fw-semibold fx-14">Pending</h5>
                    <div className="users-card-wrapper">
                      {pending?.length === 0 ? (
                        <p>Data is not found</p>
                      ) : (
                        pending?.map((item, i) => {
                          return (
                            <div
                              key={i}
                              className=" card-box-frame d-flex  align-items-center"
                            >
                              <img
                                className="img-section"
                                src={item?.user?.avatar}
                                alt=""
                              />
                              <div className="description-box w-100">
                                <p className="fx-16 w-100  fw-normal mb-2 ellipsis-3">
                                  {item?.text}
                                </p>
                                <div className="button-section d-flex align-items-center justify-content-between">
                                  <p className="d-flex align-items-center justify-content-center gap-2">
                                    <FaShare />
                                    &nbsp;&nbsp; {item?.user?.name}{" "}
                                  </p>
                                  <div className="button-rrapper d-flex align-items-center justify-content-center gap-3">
                                    <button
                                      type="button"
                                      class="btn text-success"
                                      onClick={() => accpetHandler(item.id)}
                                    >
                                      Accpet
                                    </button>
                                    <button
                                      type="button"
                                      class="btn text-danger "
                                      onClick={() => reajectHandler(item.id)}
                                    >
                                      Reaject
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <h5 className="fw-semibold fx-14">Approved</h5>

                    <div className="users-card-wrapper">
                      {approve?.length === 0 ? (
                        <p>Data is not found</p>
                      ) : (
                        approve?.map((item, i) => (
                          <div
                            key={i}
                            className="card-box-frame d-flex align-items-center"
                          >
                            <img
                              className="img-section"
                              src={item?.user?.avatar}
                              alt=""
                            />
                            <div className="description-box">
                              <p className="fx-16 w-100 fw-normal mb-2 ellipsis-3">
                                {item?.text}
                              </p>
                              <div className="button-section d-flex align-items-center justify-content-between">
                                <p className="d-flex align-items-center justify-content-center gap-2">
                                  <FaShare />
                                  &nbsp;&nbsp; {item?.user?.name}{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                </div>
              )}
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
}
