using System.Threading.Tasks;
using CoreWebApi.Data.DTOs;
using CoreWebApi.Data.models;
using MongoDB.Driver;

namespace souschef.server.Data.Repository.Contracts
{
    public interface ICookingSessionRepository
    { 
        Task<UpdateResult> GetTask();
        Task<UpdateResult> GetUsers();
    }
}