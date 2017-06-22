using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute("ProductionConfiguration",typeof(greentrade2.Startup))]
namespace greentrade2
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
