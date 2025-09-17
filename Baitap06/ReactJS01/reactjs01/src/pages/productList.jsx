import { useEffect, useState, useMemo } from "react";
import { Row, Col, Card, Button, Select, Pagination, Spin, Input } from "antd";
import axios from "axios";
import Fuse from "fuse.js";

const { Option } = Select;

export default function ProductList() {
  const [allProducts, setAllProducts] = useState([]); // chứa toàn bộ dữ liệu từ API
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const limit = 4;

  // lấy danh mục
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/v1/api/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // lấy toàn bộ sản phẩm
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/v1/api/products", {
        params: {
          category,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        },
      });

      setAllProducts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
    setLoading(false);
  };

  // gọi API categories lúc mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // reset page về 1 khi filter thay đổi
  useEffect(() => {
    setPage(1);
  }, [category, minPrice, maxPrice, keyword]);

  // gọi API products khi filter thay đổi
  useEffect(() => {
    fetchAllProducts();
    // eslint-disable-next-line
  }, [category, minPrice, maxPrice]);

  // xử lý search + phân trang client-side
  const filteredProducts = useMemo(() => {
    let data = [...allProducts];

    // Fuzzy search với Fuse.js
    if (keyword) {
      const fuse = new Fuse(data, {
        keys: ["name"], // search theo trường name
        threshold: 0.4, // 0.0 - 1.0: value càng nhỏ thì yêu cầu chính xác càng cao, value cao thì cho phép sai số nhiều hơn, trả về nhiều kết quả hơn.
        ignoreLocation: true, // cho phép keyword xuất hiện ở bất cứ đâu trong keys (ở TH này là name), false: lấy keyword ở gần location mặc định (0: bắt đầu chuỗi) hơn
      });
      data = fuse.search(keyword).map((r) => r.item);
    }

    return data;
  }, [allProducts, keyword]);

  const totalItems = filteredProducts.length;

  // cắt dữ liệu theo page hiện tại
  const pagedProducts = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredProducts.slice(start, start + limit);
  }, [filteredProducts, page]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background:
          "radial-gradient(circle at 50% 50%, #e0e7ff 0%, #fdf6e3 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "24px",
            textAlign: "center",
            color: "#1f2937",
          }}
        >
          🛍️ Danh sách sản phẩm
        </h2>

        {/* Filter */}
        <div
          style={{
            marginBottom: "24px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            background: "#f9fafb",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <Select
            value={category || "all"}
            style={{ width: 200 }}
            onChange={(value) => {
              setCategory(value === "all" ? "" : value);
            }}
          >
            <Option value="all">Tất cả danh mục</Option>
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          <Input
            placeholder="🔎 Tìm sản phẩm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: 200 }}
          />

          <Input
            type="number"
            placeholder="Giá tối thiểu"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ width: 140 }}
          />
          <Input
            type="number"
            placeholder="Giá tối đa"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: 140 }}
          />

          <Button
            type="primary"
            onClick={() => {
              fetchAllProducts();
              setPage(1);
            }}
          >
            Lọc sản phẩm
          </Button>
        </div>

        {/* Grid sản phẩm */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[20, 20]}>
            {pagedProducts.map((p) => (
              <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "transform 0.2s",
                  }}
                  cover={
                    <img
                      alt={p.name}
                      src={p.imageUrl || "img/product.png"}
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        padding: "16px",
                        background: "#fdfdfd",
                      }}
                    />
                  }
                >
                  <Card.Meta
                    title={
                      <span style={{ fontWeight: "600", fontSize: "16px" }}>
                        {p.name}
                      </span>
                    }
                    description={p.category?.name || "Khác"}
                  />
                  <p
                    style={{
                      marginTop: "12px",
                      fontWeight: "bold",
                      color: "#16a34a",
                      fontSize: "16px",
                    }}
                  >
                    ${p.price}
                  </p>
                  <p style={{ fontSize: "13px", color: "#666" }}>
                    Còn lại: {p.quantity}
                  </p>
                  <Button type="primary" block style={{ marginTop: "12px" }}>
                    🛒 Thêm vào giỏ
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Pagination */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Pagination
            current={page}
            pageSize={limit}
            total={totalItems}
            onChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  );
}
