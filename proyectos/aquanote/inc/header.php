<?php
// inc/header.php
?><!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aquanote</title>
    <link rel="stylesheet" href="/proyectos/aquanote/css/style.css">
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const toggle = document.getElementById("menu-toggle");
            const container = document.getElementById("menu-contenedor");
            if (toggle && container) {
                toggle.addEventListener("click", () => {
                    container.classList.toggle("open");
                });
            }
        });
    </script>
</head>
<body>
<header>
    <div class="contenedor">
    <div class="logo">
        <img src="/proyectos/aquanote/img/logo-horizontal.svg" alt="Aquanote" height="40">
    </div>
    <div class="menu-contenedor" id="menu-contenedor">
        <button id="menu-toggle" class="menu-toggle">☰</button>
        <div class="menu-dropdown">
            <a href="../index.php">Inicio</a>
            <a href="../cuenta.php">Mi cuenta</a>
            <a href="../mi-acuario.php">Mi acuario</a>
            <a href="../logout.php">Cerrar sesión</a>
        </div>
    </div>
</header>