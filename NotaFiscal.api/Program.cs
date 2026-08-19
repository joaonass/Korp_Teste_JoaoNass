using Microsoft.EntityFrameworkCore;
using NotaFiscal.api.Clients;
using NotaFiscal.api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("NotaFiscalDataBase")
    ));

// Registra o EstoqueClient
builder.Services.AddHttpClient<EstoqueClient>();

// CORS para permitir o Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("Angular", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("Angular");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();