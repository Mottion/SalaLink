namespace SalaLink.Infrastructure.Middlewares;

public class TenantMiddleware(RequestDelegate next)
{
  private readonly RequestDelegate _next = next;

  public async Task InvokeAsync(HttpContext context)
  {
    // Extract tenant information from the request (e.g., from headers, query parameters, etc.)
    var tenantId = context.Request.Headers["X-Tenant-ID"].FirstOrDefault();

    if (!string.IsNullOrEmpty(tenantId))
    {
      // Store tenant information in the HttpContext for later use
      context.Items["TenantId"] = tenantId;
    }

    // Call the next middleware in the pipeline
    await _next(context);
  }
}