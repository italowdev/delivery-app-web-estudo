import React,{useMemo,useState} from 'react';
import{createRoot}from'react-dom/client';
import'./style.css';

const cats=[
 ['🍽️','Todos'],['🍔','Hambúrguer'],['🍕','Pizza'],['🍣','Japonesa'],['🥤','Bebidas'],['🍰','Sobremesas']
];
const foods=[
 {id:1,nome:'X-Bacon Especial',rest:'Burger House',cat:'Hambúrguer',img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',price:24.9,rating:'4.9',time:'25-35 min'},
 {id:2,nome:'Pizza de Calabresa',rest:'Pizzaria Central',cat:'Pizza',img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',price:39.9,rating:'4.8',time:'30-40 min'},
 {id:3,nome:'Combo Sushi',rest:'Sushi House',cat:'Japonesa',img:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',price:42.9,rating:'4.7',time:'35-45 min'},
 {id:4,nome:'Milkshake de Chocolate',rest:'Sweet House',cat:'Bebidas',img:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',price:16.9,rating:'4.8',time:'15-25 min'}
];

function money(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}

function App(){
 const[search,setSearch]=useState('');
 const[cat,setCat]=useState('Todos');
 const[cart,setCart]=useState([]);
 const list=useMemo(()=>foods.filter(f=>
   (cat==='Todos'||f.cat===cat)&&(`${f.nome} ${f.rest}`.toLowerCase().includes(search.toLowerCase()))
 ),[search,cat]);
 const total=cart.reduce((s,f)=>s+f.price,0);

 return <div className="app">
  <header><div className="nav">
   <div className="logo">🍴 <b>Food<span>Go</span></b></div>
   <button className="location"><small>Entregar em</small><b>Timbaúba, PE⌄</b></button>
   <nav><a href="#inicio">Início</a><a href="#categorias">Categorias</a><a href="#pedidos">Mais pedidos</a></nav>
   <button className="profile">I</button>
  </div></header>

  <main>
   <section className="hero" id="inicio">
    <div><p className="eyebrow">DELIVERY RÁPIDO E FÁCIL</p>
     <h1>O que você quer <span>comer hoje?</span></h1>
     <p className="heroText">Encontre seus pratos favoritos e receba onde estiver.</p>
     <div className="search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar comida ou restaurante"/></div>
    </div>
    <div className="heroFood">🍔</div>
   </section>

   <section className="section" id="categorias">
    <div className="sectionTitle"><div><p className="eyebrow">EXPLORE</p><h2>Categorias</h2></div><button onClick={()=>setCat('Todos')}>Ver todas</button></div>
    <div className="categories">{cats.map(([emoji,name])=>
      <button key={name} className={`category ${cat===name?'active':''}`} onClick={()=>setCat(name)}><span>{emoji}</span><b>{name}</b></button>
    )}</div>
   </section>

   <section className="promo"><div><p>OFERTA ESPECIAL</p><h2>20% OFF</h2><span>No seu primeiro pedido</span><button>PEÇA AGORA →</button></div><div className="promoEmoji">🍟</div></section>

   <section className="section" id="pedidos">
    <div className="sectionTitle"><div><p className="eyebrow">POPULAR</p><h2>Mais pedidos</h2></div><button onClick={()=>setCat('Todos')}>Ver todos</button></div>
    <div className="grid">{list.map(f=>
      <article className="card" key={f.id}>
       <div className="image"><img src={f.img} alt={f.nome}/><button className="heart">♡</button></div>
       <div className="content"><div className="heading"><div><h3>{f.nome}</h3><p>{f.rest}</p></div><span className="rating">★ {f.rating}</span></div>
       <div className="details">🕐 {f.time} <i>•</i> Entrega grátis</div>
       <div className="bottom"><strong>{money(f.price)}</strong><button onClick={()=>setCart(c=>[...c,f])}>+ Adicionar</button></div></div>
      </article>
    )}</div>
    {!list.length&&<div className="empty">🔎<h3>Nenhum resultado encontrado</h3><p>Tente buscar outro prato ou categoria.</p></div>}
   </section>
  </main>

  {cart.length>0&&<button className="cart" onClick={()=>alert(`Seu pedido tem ${cart.length} item(ns). Total: ${money(total)}`)}>
    <span className="cartIcon">🛒</span><div><b>Seu carrinho</b><small>{cart.length} item(ns)</small></div><strong>{money(total)}</strong><span>→</span>
  </button>}

  <footer><div className="logo">🍴 <b>Food<span>Go</span></b></div><p>Seu delivery de comida favorito.</p></footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);