using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace SousChef.Data;

public class PostGresDBContext : IdentityDbContext<ApplicationUser>
{
    public PostGresDBContext(DbContextOptions<PostGresDBContext> options) : base(options) 
    { 

    }

    public DbSet<ApplicationUser>? ApplicationUsers { get; set; }
}