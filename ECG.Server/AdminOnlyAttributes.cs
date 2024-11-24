using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;namespace ECG.Server
{


    public class AdminOnlyAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var user = context.HttpContext.User;
            var isAdminClaim = user.FindFirst("isAdmin")?.Value;

            if (string.IsNullOrEmpty(isAdminClaim) || isAdminClaim != "True")
            {
                context.Result = new ForbidResult();
            }

            base.OnActionExecuting(context);
        }
    }

}
