using Microsoft.EntityFrameworkCore;
using souschef.server.Data;
using souschef.server.Data.Models;
using souschef.server.Data.Repository;
using souschef.server.Data.Repository.Contracts;
using souschef.server.Helpers;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<PostGresDBContext>(opt =>
        opt.UseNpgsql(ConnectionHelper.GetConnectionString("Username=postgres;Password=postgres;Server=db;Database=SousChefDB")));

builder.Services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<PostGresDBContext>();

builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();
builder.Services.AddScoped<ICookingSessionRepository, CookingSessionRepository>();

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    Console.WriteLine("Dev");
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    Console.WriteLine("Prod");
    var scope = app.Services.CreateScope();
    await DataHelper.ManageDataAsync(scope.ServiceProvider);
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();


app.MapControllers();

app.Run();