using SalaLink.Infrastructure.Middlewares;

namespace SalaLink.Application.Configuration;

public static class MiddlewareConfiguration
{
  public static WebApplication AddMiddlewares(this WebApplication app)
  {
    app.UseMiddleware<TenantMiddleware>();
    return app;
  }
}