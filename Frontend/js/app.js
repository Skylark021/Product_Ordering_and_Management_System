const API = ""; // same origin (Flask serves /). If you host separately, put "http://127.0.0.1:5000"

function el(id){ return document.getElementById(id); }

async function getJSON(url, opts){ 
  const res = await fetch(url, opts);
  return res.json();
}

/* Admin */
async function login(){
  const data = await getJSON("/api/admin/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ username: el("u").value, password: el("p").value })
  });
  el("loginOut").textContent = JSON.stringify(data, null, 2);
}

async function addProduct(){
  const payload = {
    id: parseInt(el("pid").value),
    name: el("pname").value,
    price: parseFloat(el("pprice").value),
    qty: parseInt(el("pqty").value)
  };
  const data = await getJSON("/api/products", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  alert(data.ok ? "Added" : "Failed: " + (data.error||"unknown"));
  loadProducts();
}

async function removeProduct(){
  const id = parseInt(el("rid").value);
  const data = await getJSON(`/api/products/${id}`, { method: "DELETE" });
  alert(data.ok ? "Removed" : "Failed: " + (data.error||"unknown"));
  loadProducts();
}

/* Shared */
async function loadProducts(){
  const data = await getJSON("/api/products");
  const list = el("plist");
  list.innerHTML = "";
  if(!data.ok){ list.innerHTML = `<li>Error: ${data.error||"unknown"}</li>`; return; }
  data.products.forEach(p=>{
    const li = document.createElement("li");
    li.textContent = `${p.id} — ${p.name} — $${p.price} — qty: ${p.qty}`;
    list.appendChild(li);
  });
}

/* Customer */
async function order(){
  const payload = {
    id: parseInt(el("oid").value),
    qty: parseInt(el("oqty").value)
  };
  const data = await getJSON("/api/orders", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  el("orderOut").textContent = JSON.stringify(data, null, 2);
  loadProducts();
}

async function viewOrdered(){
  const data = await getJSON("/api/orders");
  const list = el("olist");
  list.innerHTML = "";
  if(!data.ok){ list.innerHTML = `<li>Error: ${data.error||"unknown"}</li>`; return; }
  data.ordered.forEach(o=>{
    const li = document.createElement("li");
    li.textContent = `${o.id} — ${o.name} — ordered: ${o.ordered_qty}`;
    list.appendChild(li);
  });
}