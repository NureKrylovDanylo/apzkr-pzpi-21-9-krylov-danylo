using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace StockDetector
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {

        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var text = input.Text;

            if(int.TryParse(text, out var id))
            {
                using (var client = new HttpClient())
                {
                    string url = "https://localhost:44389/Rows/TakeProduct?id=" + id;
                    var request = new HttpRequestMessage(new HttpMethod("DELETE"), url);

                    try
                    {
                        var response = client.SendAsync(request).Result;
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Error. Message: " + ex.Message);
                    }
                }
            }
            else
            {
                MessageBox.Show("Success");
            }
        }
    }
}