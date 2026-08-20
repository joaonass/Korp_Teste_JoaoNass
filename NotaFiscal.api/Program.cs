using Microsoft.EntityFrameworkCore;
using NotaFiscal.api.Clients;
using NotaFiscal.api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("NotaFiscalDataBase")
    ));

builder.Services.AddHttpClient<EstoqueClient>(client =>
{
    client.BaseAddress = new Uri("http://localhost:5250/");
});

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


// Aplica as migrations automaticamente ao iniciar a API
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.Migrate();
}


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("Angular");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();