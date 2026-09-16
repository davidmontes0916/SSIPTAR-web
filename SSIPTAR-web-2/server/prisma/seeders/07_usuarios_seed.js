const { prisma } = require('../../src/config/prisma');
const bcrypt = require('bcryptjs');

async function main() {
  const hashedPassword = await bcrypt.hash('Admin1234', 10);

  await prisma.usuario.create({
    data: {
      nombre: 'Admin',
      apellido_paterno: 'Principal',
      apellido_materno: 'Sistema',
      correo: 'admin@sistema.com',
      contrasena: hashedPassword,
      estado: 'Activo'
    }
  });

  console.log('Seeder de Usuarios ejecutado correctamente ✅');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });