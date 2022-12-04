using Microsoft.EntityFrameworkCore;
using souschef.server.Data;
using souschef.server.Data.Models;
using souschef.server.Data.Repository;
using souschef.server.Data.Repository.Contracts;
using souschef.server.Helpers;



var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<PostGresDBContext>(opt =>
        opt.UseNpgsql(ConnectionHelper.GetConnectionString("Db")));

builder.Services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<PostGresDBContext>();

builder.Services.AddScoped<RecipeRepository>();
builder.Services.AddScoped<CookingSessionRepository>();


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}
else
{
    var scope = app.Services.CreateScope();
    await DataHelper.ManageDataAsync(scope.ServiceProvider);
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();


app.MapControllers();

app.Run();