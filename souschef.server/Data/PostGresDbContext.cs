using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace souschef.server.Data;

public class PostGresDBContext : IdentityDbContext<ApplicationUser>
{
    public PostGresDBContext(DbContextOptions<PostGresDBContext> options) : base(options) 
    { 

    }

    public DbSet<ApplicationUser>? ApplicationUsers { get; set; }
}