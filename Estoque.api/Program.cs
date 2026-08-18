using Estoque.api.Data;
using Estoque.api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();


builder.Services.AddDbContext<EstoqueDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("EstoqueDataBase")));

builder.Services.AddScoped<IProdutoService, ProdutoService>();


builder.Services.AddOpenApi();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
