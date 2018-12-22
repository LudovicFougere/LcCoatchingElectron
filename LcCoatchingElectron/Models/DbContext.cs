using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LcCoatchingElectron.Models
{
    public class DbContext
    {
        public string ConnectionString { get; set; }

        public DbContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }


        public IEnumerable<Client> GetClients()
        {


            List<Client> listUsers = new List<Client>();

            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();

                MySqlCommand cmd = new MySqlCommand("SELECT * FROM qiklb_visforms", connection);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        listUsers.Add(new Client()
                        {
                            Id = reader.GetInt32("id"),
                            Nom = reader.GetString("nom"),
                            Prenom = reader.GetString("prenom"),
                            Email = reader.GetString("email"),
                            Telephone = reader.GetInt32("telephone"),
                            DateNaissance = reader.GetDateTime("date_naissance"),
                            Genre = reader.GetString("genre"),
                            Taille = reader.GetInt32("taille"),
                            Poids = reader.GetInt32("poids"),
                            Projet = reader.GetString("projet")
                        });
                    }
                }
            }
            return listUsers.ToList();
        }


        public Client GetClient(int id)
        {


            Client client = new Client();
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string request = string.Format("SELECT * FROM qiklb_visforms WHERE id = {0}", id);
                MySqlCommand cmd = new MySqlCommand(request, connection);
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        client =  new Client()
                        {
                            Id = reader.GetInt32("id"),
                            Nom = reader.GetString("nom"),
                            Prenom = reader.GetString("prenom"),
                            Email = reader.GetString("email"),
                            Telephone = reader.GetInt32("telephone"),
                            DateNaissance = reader.GetDateTime("date_naissance"),
                            Genre = reader.GetString("genre"),
                            Taille = reader.GetInt32("taille"),
                            Poids = reader.GetInt32("poids"),
                            Projet = reader.GetString("projet")
                        };
                    }
                }
            }
            return client;

        }

        //To Update the records of a particluar employee   
        public int UpdatClient(Client client)
        {
            try
            {

                using (MySqlConnection connection = GetConnection())
                {
                    connection.Open();

                    MySqlCommand cmd = new MySqlCommand("SELECT * FROM qiklb_visforms", connection);
                    cmd.ExecuteNonQuery();
                }

                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
