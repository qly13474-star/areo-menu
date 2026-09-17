import { useState } from "react";

type View = "home" | "menu" | "orders" | "tables";

export default function App() {
  const [view, setView] = useState<View>("home");

  const navigation = [
    { id: "home" as View, label: "الرئيسية", icon: "⌂" },
    { id: "menu" as View, label: "القائمة", icon: "☰" },
    { id: "orders" as View, label: "الطلبات", icon: "🛒" },
    { id: "tables" as View, label: "الطاولات و QR", icon: "▦" }
  ];

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <div className="brand">AREO Menu</div>
          <div className="brand-subtitle">
            نظام إدارة المطاعم والمقاهي
          </div>
        </div>

        <div className="restaurant-badge">
          <span className="status-dot" />
          مطعمي التجريبي
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-title">لوحة التحكم</div>

          {navigation.map((item) => (
            <button
              key={item.id}
              className={`nav-button ${view === item.id ? "active" : ""}`}
              onClick={() => setView(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div className="trial-card">
            <strong>التجربة المجانية</strong>
            <span>15 يومًا</span>
            <small>يمكنك تجربة النظام قبل الاشتراك</small>
          </div>
        </aside>

        <main className="content">
          {view === "home" && <Dashboard />}
          {view === "menu" && <MenuView />}
          {view === "orders" && <OrdersView />}
          {view === "tables" && <TablesView />}
        </main>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <section className="welcome">
        <div>
          <p className="eyebrow">مرحبًا بك في AREO Menu</p>
          <h1>لوحة تحكم مطعمك</h1>
          <p>
            أدر قائمتك وطلباتك وطاولاتك من مكان واحد.
          </p>
        </div>

        <button className="primary-button">
          + إضافة منتج
        </button>
      </section>

      <section className="stats">
        <Stat title="طلبات اليوم" value="0" />
        <Stat title="الطلبات الجديدة" value="0" />
        <Stat title="الطاولات" value="12" />
        <Stat title="إجمالي المبيعات" value="0 د.ع" />
      </section>

      <section className="grid-two">
        <div className="panel">
          <div className="panel-header">
            <h2>آخر الطلبات</h2>
            <span>اليوم</span>
          </div>

          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <strong>لا توجد طلبات حتى الآن</strong>
            <p>
              عندما يطلب الزبائن من القائمة الرقمية ستظهر الطلبات هنا.
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>حالة الطاولات</h2>
            <span>12 طاولة</span>
          </div>

          <div className="table-preview">
            <Table number={1} status="متاحة" />
            <Table number={2} status="متاحة" />
            <Table number={3} status="مشغولة" />
            <Table number={4} status="متاحة" />
            <Table number={5} status="مشغولة" />
            <Table number={6} status="متاحة" />
          </div>
        </div>
      </section>
    </>
  );
}

function MenuView() {
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">إدارة المحتوى</p>
          <h1>قائمة الطعام</h1>
          <p>أضف الأصناف والأسعار والتصنيفات والتوفر.</p>
        </div>

        <button className="primary-button">+ إضافة منتج</button>
      </div>

      <div className="panel">
        <div className="empty-state">
          <div className="empty-icon">🍔</div>
          <strong>قائمتك جاهزة للبناء</strong>
          <p>
            سنربط هذه الصفحة لاحقًا بقاعدة بيانات Firebase
            لإدارة المنتجات الحقيقية.
          </p>
        </div>
      </div>
    </section>
  );
}

function OrdersView() {
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">التشغيل</p>
          <h1>الطلبات</h1>
          <p>تابع الطلبات وحالات تجهيزها.</p>
        </div>
      </div>

      <div className="panel">
        <div className="empty-state">
          <div className="empty-icon">🛎️</div>
          <strong>لا توجد طلبات</strong>
          <p>ستظهر الطلبات الحقيقية هنا بعد ربط Firebase.</p>
        </div>
      </div>
    </section>
  );
}

function TablesView() {
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">QR</p>
          <h1>الطاولات و QR</h1>
          <p>أنشئ QR مستقلًا لكل طاولة في المطعم.</p>
        </div>

        <button className="primary-button">+ إضافة طاولة</button>
      </div>

      <div className="table-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="table-card" key={index}>
            <div className="qr-placeholder">QR</div>
            <strong>طاولة {index + 1}</strong>
            <span>جاهزة للربط</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Table({
  number,
  status
}: {
  number: number;
  status: string;
}) {
  return (
    <div className="mini-table">
      <strong>{number}</strong>
      <span>{status}</span>
    </div>
  );
      }
